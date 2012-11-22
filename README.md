# mux-memo

A memoized mux-demux stream connection

## Motivation

There are a few technical issues with websocket limitations in
    the browser. Namely the fact browsers can only open two
    websocket connections to the same domain.

Even worse then that. SockJS uses two websockets to do it's
    communication so you can only open one sockjs stream
    connection per domain.

To get around this issue cleanly it's easiest to use a library
    that allows you to open up a cached stream connection per
    domain so you never get into this issue.

There is a small issue with having a shared connection to a
    domain which is the data gets all messed up and mixed
    together. To get around this we should multiplex that
    connection by default (with mux-demux).

## Example

MuxMemo when given an uri returns you a `MuxDemux` instance and
    garantuees that you can have don't open up two sockjs
    streams to the same domain.

```
var MuxMemo = require("../..")
    , WriteStream = require("write-stream")

var mdm1 = MuxMemo("//signalchannel.co/sock")
    , mdm2 = MuxMemo("//signalchannel.co/sock")

var stream1 = mdm1.createStream("/v1/echo/x/12")
    , stream2 = mdm1.createStream("/v1/echo/x/13")

stream2.pipe(WriteStream(function (chunk) {
    console.log("got data!", chunk)
}))

stream1.write("hello world!")
```

## Installation

`npm install mux-memo`

## Contributors

 - Raynos

## MIT Licenced
