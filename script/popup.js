$(function () {
    chrome.storage.sync.get("status", function(stat) {
        if(stat.status === "on") {
            $("#on").show();
            $("#off").hide();
        }
        else {
            $("#on").hide();
            $("#off").show();
        }
    });

    $("#onBtn").click(function () {
        if(!$("#on").is(":visible")) {
            $("#on").show();
            $("#off").hide();
        }
        var stat = "on";
        chrome.storage.sync.set({"status": stat}, function () {
            console.log(stat);
        });
    });

    $("#offBtn").click(function () {
        if(!$("#off").is(":visible")) {
            $("#off").show();
            $("#on").hide();
        }
        var stat = "off";
        chrome.storage.sync.set({"status": stat}, function () {
            console.log(stat)
        });
    });
});