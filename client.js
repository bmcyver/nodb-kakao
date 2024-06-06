const config = {
  PORT: 3000,
};

Device.acquireWakeLock(android.os.PowerManager.PARTIAL_WAKE_LOCK, '');
var socket = new java.net.DatagramSocket(config.PORT);
var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 65535);
var inPacket = new java.net.DatagramPacket(buffer, buffer.length);
var ActionStorage = new Map();

function B64Decode(str) {
  return java.lang.String(
    android.util.Base64.decode(str, android.util.Base64.DEFAULT),
    'UTF-8',
  );
}

function Message(message) {
  var _a, _b;
  var _c = JSON.parse(message),
    type = _c.type,
    roomId = _c.roomId,
    msg = _c.msg;
  switch (type) {
    case 'send':
      var action =
        (_a = ActionStorage.get(roomId)) === null || _a === void 0
          ? void 0
          : _a[0];
      if (!action) return Log.e('No Actions');
      var intent = new android.content.Intent();
      var bundle = new android.os.Bundle();
      var remoteInputs = action.getRemoteInputs();
      for (var _i = 0, _d = Array.from(remoteInputs); _i < _d.length; _i++) {
        var input = _d[_i];
        bundle.putCharSequence(input.getResultKey(), msg);
      }
      android.app.RemoteInput.addResultsToIntent(
        action.getRemoteInputs(),
        intent,
        bundle,
      );
      try {
        action.actionIntent.send(Api.getContext(), 0, intent);
      } catch (e) {
        Log.e('failed to send action');
      }
      break;
    case 'ping':
      var action =
        (_a = ActionStorage.get(roomId)) === null || _a === void 0
          ? void 0
          : _a[0];
      if (!action) return Log.e('No Actions');
      var intent = new android.content.Intent();
      var bundle = new android.os.Bundle();
      var remoteInputs = action.getRemoteInputs();
      for (var _i = 0, _d = Array.from(remoteInputs); _i < _d.length; _i++) {
        var input = _d[_i];
        bundle.putCharSequence(
          input.getResultKey(),
          String(Date.now() - Number(msg) + 'ms'),
        );
      }
      android.app.RemoteInput.addResultsToIntent(
        action.getRemoteInputs(),
        intent,
        bundle,
      );
      try {
        action.actionIntent.send(Api.getContext(), 0, intent);
      } catch (e) {
        Log.e('failed to send action');
      }
      break;
    case 'read':
      try {
        var action_1 =
          (_b = ActionStorage.get(roomId)) === null || _b === void 0
            ? void 0
            : _b[1];
        if (!action_1) return Log.e('No Actions');
        action_1.actionIntent.send(
          Api.getContext(),
          1,
          new android.content.Intent(),
        );
      } catch (e) {
        Log.e('failed to read action');
      }
  }
}
var thread = new java.lang.Thread({
  run: function () {
    while (true) {
      socket.receive(inPacket);
      var message = String(
        B64Decode(
          String(
            new java.lang.String(
              inPacket.getData(),
              inPacket.getOffset(),
              inPacket.getLength(),
            ),
          ),
        ),
      );
      Message(message);
    }
  },
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onStartCompile() {
  ActionStorage.clear();
  return thread.interrupt();
}
thread.start();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onNotificationPosted(sbn) {
  var _a, _b;
  var packageName = sbn.getPackageName();
  if (packageName !== 'com.kakao.talk') return;
  var noti = sbn.getNotification();
  var actions = noti.actions;
  var bundle = noti.extras;
  if (
    !actions ||
    !bundle ||
    bundle.getString('android.template') !==
      'android.app.Notification$MessagingStyle'
  )
    return;
  var senderName = bundle.getString('android.title');
  var roomName =
    (_b =
      (_a = bundle.getString('android.subText')) !== null && _a !== void 0
        ? _a
        : bundle.getString('android.summaryText')) !== null && _b !== void 0
      ? _b
      : senderName;
  var roomId = sbn.getTag();
  var readAction = null;
  var replyAction = null;
  actions.forEach((action) => {
    if (!action.title) return;
    const title = action.title.toString();
    if (title.includes('Reply') || title.includes('답장')) replyAction = action;
    if (title.includes('Mark') || title.includes('읽음')) readAction = action;
  });
  if (!readAction || !replyAction) return;
  ActionStorage.set(roomId, [replyAction, readAction]);
  ActionStorage.set(roomName, [replyAction, readAction]);
}
