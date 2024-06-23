import * as protobufjs from 'protobufjs';
import * as fs from 'fs';
import {join} from 'path';
import { logger } from '../logger';

export async function protobuf(path: string): Promise<LocalProtobuf> {
  return new Promise((resolve) => {
    protobufjs.load(`${__dirname}/../../../kakao.proto`, function (err, root) {
      if (err || !root) {
        logger.error('❌ Failed to load Kakao local protobuf data', err);
        process.exit(1);
      }
      const result: LocalProtobuf = {};
      const proto = root.lookupType('Kakao.Local');
      try {
        const object = proto.toObject(
          proto.decode(
            fs.readFileSync(
              join(path, 'files/datastore/LocalUser_DataStore.pref.preferences_pb'),
            ),
          ),
          { longs: Number },
        ).data;
        for (const data of object) {
          result[data.key] = data.data[Object.keys(data.data)[0]];
        }
      } catch (e) {
        logger.error('❌ Failed to load Kakao local protobuf data', e);
        process.exit(1);
      }
      return resolve(result);
    });
  });
}

export interface LocalProtobuf {
  authenticationStatus?: string;
  cleanup_service_data?: number;
  hashedRefreshToken?: string;
  encrypted_auth_token?: string;
  old_encrypted_auth_token?: string;
  contactCountry?: string;
  customCountry?: string;
  country_code?: string;
  identifiedPhoneNumber?: string;
  formattedPstnNumber?: string;
  rawPhoneNumber?: string;
  formattedNsnNumber?: string;
  pch?: string | number;
  old_user_id?: number;
  accountId?: number;
  kakao_account_email?: string;
  signUpPostMessage?: string;
  oldIdentifiedPhoneNumber?: string;
  needToReauthenticate?: number;
  authentication_at_install?: number;
  signupSession?: string;
  try_restoration_user_id?: number;
  try_restoration_account_id?: number;
  authenticationViewData?: string;
  nickName?: string;
  statusMessage?: string;
  profileImageUrl?: string;
  fullProfileImageUrl?: string;
  originalProfileImageUrl?: string;
  accountDisplayId?: string;
  hashedAccountId?: string;
  kakao_account_status?: number;
  kakao_account_verified?: number;
  kakaoAccountServiceUserId?: number;
  signupKaccountUrl?: string;
  signupKaccountInduceInterval?: number;
  kaccountAlertType?: number;
  kaccountAlertLocation?: string;
  kakao_account_status_for_setting?: number;
  birthdayNotification?: number;
  UUID?: string;
  userType?: number;
  fullAnimatedProfileImageUrl?: string;
  originalAnimatedProfileImageUrl?: string;
  agree_adid_terms?: number;
  memochat_user_id?: number;
  blockRevision?: number;
  plusBlockRevision?: number;
  deviceId?: string;
}
