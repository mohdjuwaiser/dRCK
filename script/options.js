$(document).ready(function () {
    var sitesAsString = "";

    chrome.storage.sync.get("newList", function (list) {
        $("#excludeInput").val(list.newList);
        sitesAsString = list.newList;
    });

    // excludeInput is empty?

    var sites = getArrayOfSites($("#excludeInput").val());
    updatePageStyle(sites);

    $("#updateExcludeButton").click(function () {
        var list = $('#excludeInput').val();

        chrome.storage.sync.set({"newList": list}, function () {
            console.log(list);
        });

        $("#submitAlert").fadeIn().delay(2500).fadeOut();
    })
});

/*
 * convert a string of sites into array of sites and return
 */
function getArrayOfSites(sites) {
    console.log(sites);
    var array = sites.split(", ");
    for(var i = 0; i < array.length; i++) {
        var output = i + ": " + array[i];
        console.log(output);
    }
    return array;
}

/*
 * disable style/extension on the excluded sites
 */
function updatePageStyle(excludedSites) {
    var url = window.location.href;
    var isMatched = false;

    if(excludedSites == null || excludedSites.length <= 0) {
        alert(excludedSites);
        return;
    }

    for(var i = 0; i < excludedSites.length; i++) {
        if(url.indexOf(excludedSites[i]) >= 0) {
            alert("match");
            isMatched = true;

            chrome.tabs.insertCSS();

            break;
        }
    }

    if(!isMatched) {
        alert("not match");
    }
}