# Nodejs KakaoTalk Database Listener
Node.js 기반 카카오 디비 리스너

## 요구사항
 - [리드로이드](https://github.com/remote-android/redroid-doc)
  - 설치방법은 []()를 참고하세요.
 - [스타라이트](https://starlight.mooner.dev/)
   - 설치방법은 []()를 참고하세요.
 - 기타
   - 설치방법은 []()를 참고하세요.

## 기능
 - Kakao Share (구 Kakaolink)

## 사용된 라이브러리
 - [drizzle-orm](https://orm.drizzle.team)
 - [kakao db parser](https://github.com/suRin01/kakao_db_parser)
 - [tslog](https://tslog.js.org)
 - [typed-emitter](https://github.com/andywer/typed-emitter)

## 라이센스
 - MIT 라이센스

## TroubleShooting
- Database Connection Manager failed to load
    - 카카오톡 디렉토리의 경로가 정확한지 확인하여 주십시오.
    - 카카오톡 디렉토리에 접근 권한이 있는지 확인하여 주십시오.
- Kakao local protobuf failed to load
  - 카카오톡 디렉토리의 경로가 정확한지 확인하여 주십시오.
  - 카카오톡 디렉토리에 접근 권한이 있는지 확인하여 주십시오.
- 메시지가 전송되지 않습니다.
  - 클라이언트(봇 앱)과 서버의 포트가 일치하는지 확인하여 주십시오.

## Requirements
- 리눅스 기반 안드로이드 에뮬레이터 (remote-android 추천)

## License
이 라이브러리는 **GNU Affero General Public License v3.0**로 라이센싱 되었으며, 루트 디렉토리에 위치한 **LICENSE** 파일에서 자세하게 확인하실 수 있습니다.


 *Note: 이 라이브러리는 카카오 또는 카카오톡이 승인하지 않았으며, 사용하며 발생하는 모든 문제에 대한 책임은 모두 사용자에게 있습니다.* 

🔍 Trace: 세부 정보 추적
🐛 Debug: 디버그 메시지
ℹ️ Info: 일반 정보
⚠️ Warn: 경고 메시지
❌ Error: 에러 발생
🚨 Fatal: 치명적 오류

✅ Success: 작업 성공
🔄 Processing: 작업 진행 중
⏳ Waiting: 대기 중
🚀 Starting: 시작 중
🛑 Stopped: 중지됨

🌐 Network: 네트워크 관련
📡 Connection: 연결 상태
📥 Received: 데이터 수신
📤 Sent: 데이터 전송

🗄️ Database: 데이터베이스 관련
📊 Query: 쿼리 실행
💾 Save: 데이터 저장
🔄 Update: 데이터 업데이트