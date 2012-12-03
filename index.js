var sock = require("sockjs-stream")
    , MuxDemux = require("mux-demux")
    , Individual = require("individual")

    , mdmPool = Individual("__SIGNAL_CHANNEL_POOL", {})

module.exports = MuxMemo

function MuxMemo(uri, options) {
    var mdm = mdmPool[uri]

    if (!mdm) {
        var stream = sock(uri, options)
            , mdm = MuxDemux()

        mdmPool[uri] = mdm

        stream.on("connect", function () {
            mdm.emit("connect")
        })

        stream.on("close", function (ev) {
            mdm.emit("closed", ev)
        })

        stream.pipe(mdm).pipe(stream)
    }

    return mdm
}
