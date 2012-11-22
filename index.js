var sock = require("sockjs-stream")
    , MuxDemux = require("mux-demux")
    , Individual = require("individual")

    , mdmPool = Individual("__SIGNAL_CHANNEL_POOL", {})

module.exports = MuxMemo

function MuxMemo(uri) {
    var mdm = mdmPool[uri]

    if (!mdm) {
        var stream = sock(uri)
            , mdm = MuxDemux()

        mdmPool[uri] = mdm

        stream.on("connect", function () {
            mdm.emit("connect")
        })

        stream.pipe(mdm).pipe(stream)
    }

    return mdm
}
