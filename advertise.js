const PREBID_TIMEOUT = 1000;

const adBlockData = [
    {
        title: "AdvertiseX GetAdvertisexBid",
        code: "advertisex-block-1",
        sizes: [[300, 150]],
        bidder: "advertisexGetAdvertisexBid",
        params: {
            adUnitCode: "123qwe"
        }
    },
    {
        title: "AdvertiseX GetAnotherBid",
        code: "advertisex-block-2",
        sizes: [[728, 110]],
        bidder: "advertisexGetAnotherBid",
        params: {
            adUnitCode: "456asd"
        }
    },
    {
        title: "AdvertiseX All Bids",
        code: "advertisex-block-3",
        sizes: [[300, 550]],
        bidder: "advertisexAllBids",
        params: {
            adUnitCode: "101uvw"
        }
    }
];

const adUnits = adBlockData.map(block => ({
    code: block.code,
    mediaTypes: {
        banner: {
            sizes: block.sizes
        }
    },
    bids: [{
        bidder: block.bidder,
        params: block.params
    }]
}));

document.addEventListener("DOMContentLoaded", () => {
    const container = document.body;
    adBlockData.forEach(block => {
        const [width, height] = block.sizes[0];
        const adContainer = document.createElement("div");
        adContainer.className = "ad-container";
        adContainer.innerHTML = `
            <h2 class="text-center">${block.title}</h2>
            <div id="${block.code}" class="ad-content" style="border: 1px solid black; padding: 10px; width: ${width}px; height: ${height}px;"></div>
        `;
        container.appendChild(adContainer);

        const separator = document.createElement("div");
        separator.className = "separator";
        container.appendChild(separator);
    });

    const separators = document.querySelectorAll('.separator');
    if (separators.length > 0) {
        separators[separators.length - 1].remove();
    }

    pbjs.que.push(function() {
        pbjs.addAdUnits(adUnits);
        pbjs.requestBids({
            timeout: PREBID_TIMEOUT,
            bidsBackHandler: initAdserver
        });
    });
});

function initAdserver() {
    adBlockData.forEach(function(block) {
        var adDiv = document.getElementById(block.code);
        if (adDiv) {
            var bidResponse = pbjs.getBidResponsesForAdUnitCode(block.code);
            if (bidResponse && bidResponse.bids && bidResponse.bids.length > 0) {
                if (bidResponse.bids.length > 1) {
                    bidResponse.bids.forEach(function(bid, index, array) {
                        adDiv.innerHTML += bid.ad;
                        if (index < array.length - 1) {
                            adDiv.innerHTML += '<hr>';
                        }
                    });
                } else {
                    var bid = bidResponse.bids[0];
                    pbjs.renderAd(adDiv, bid.adId);
                    adDiv.innerHTML = bid.ad;
                }
            } else {
                console.error(`No valid bids received for ${block.title}`);
                adDiv.innerHTML = `<p>No valid bids received for ${block.title}</p>`;
            }
        } else {
            console.error(`The wrapper for block ${block.code} not found`);
        }
    });
}
