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