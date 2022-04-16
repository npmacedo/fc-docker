FROM golang:1.15.0-alpine as builder

WORKDIR /go/src/codeedu 

COPY main.go . 

RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /codeedu


FROM scratch

COPY --from=builder /codeedu /codeedu

ENTRYPOINT ["/codeedu"]