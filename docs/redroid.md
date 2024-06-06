# Redroid

## 설치
[공식문서](https://github.com/remote-android/redroid-doc/blob/master/deploy/README.md)에 따라 설치를 진행해주세요.

## docker-compose
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

## Trouble Shooting
redroid와 관련된 문제는 [공식문서](https://github.com/remote-android/redroid-doc#Troubleshooting)를 참고해주세요.