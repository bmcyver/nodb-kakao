# Redroid

## 설치
[공식문서](https://github.com/remote-android/redroid-doc/blob/master/deploy/README.md)에 따라 설치를 진행해주세요.

## docker-compose
설치가 완료되면 `docker-compose.yml` 파일을 생성하고 아래 내용을 추가해주세요.
```yaml
services:
  redroid:
    privileged: true
    volumes:
      - ./redroid:/data
    ports:
      - 5555:5555
      - 3000:3000/udp
    command:
      - androidboot.redroid_gpu_mode=guest
      - ro.product.model=SM-T970
    container_name: redroid
    image: 'redroid/redroid:13.0.0-latest'
    restart: unless-stopped
```
이후 `docker-compose up -d` 명령어를 실행하면 redroid가 실행됩니다.

## Trouble Shooting
redroid와 관련된 문제는 [공식문서](https://github.com/remote-android/redroid-doc#Troubleshooting)를 참고해주세요.

## 환경 세팅
1. [adb](https://developer.android.com/tools/releases/platform-tools)
    - adb 연결을 위해 필요합니다. 가이드에 따라 설치해주세요.
2. [scrcpy](https://github.com/Genymobile/scrcpy)
    - GUI 환경에서 디바이스를 제어하기 위해 필요합니다. 가이드에 따라 설치해주세요.

```bash
adb connect ip port # adb를 통해 연결
adb install kakaotalk.apk # 카카오톡 설치
adb install msgbot.apk # 메신저봇 설치
scrcpy # GUI 환경으로 연결
```