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
