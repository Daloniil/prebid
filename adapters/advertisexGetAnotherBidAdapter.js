import { logInfo } from '../src/utils.js';
import { registerBidder } from '../src/adapters/bidderFactory.js';
import { BANNER } from '../src/mediaTypes.js';

const BIDDER_CODE = 'advertisexGetAnotherBid';
const ADAPTER_VERSION = '1.0';
const DEFAULT_BID_TTL = 360;
const DEFAULT_CURRENCY = 'USD';
const ADVERTISEX_REQUEST_METHOD = 'POST';
const ADVERTISEX_BID_ENDPOINT = 'http://localhost:3000/api/getAnotherBid';

function parseBid(response, requestData) {
    return {
        requestId: requestData.bidId,
        cpm: response.cpm,
        width: response.width,
        height: response.height,
        creativeId: response.creativeId,
        currency: DEFAULT_CURRENCY,
        netRevenue: true,
        ttl: DEFAULT_BID_TTL,
        ad: response.ad,
        adId: response.bidId,
        bidder: BIDDER_CODE,
    };
}

const spec = {
    code: BIDDER_CODE,
    version: ADAPTER_VERSION,
    supportedMediaTypes: [BANNER],

    isBidRequestValid: function (bid) {
        return (
            bid &&
            bid.hasOwnProperty('params') &&
            bid.params.hasOwnProperty('adUnitCode') &&
            bid.hasOwnProperty('bidder')
        );
    },

    buildRequests: function (bidRequests, bidderRequest) {
        return bidRequests.map(bid => {
            const data = {
                adUnitCode: bid.params.adUnitCode,
                sizes: bid.sizes,
                bidId: bid.bidId,
            };

            return {
                method: ADVERTISEX_REQUEST_METHOD,
                url: ADVERTISEX_BID_ENDPOINT,
                data,
            };
        });
    },

    interpretResponse: function (serverResponse, request) {
        const bidResponses = [];
        const response = serverResponse.body;

        let requestData = request.data;

        if (typeof requestData === 'string') {
            requestData = JSON.parse(requestData);
        }

        if (response && response.creativeId.startsWith('advertisex')) {
            let bidResponse = parseBid(response, requestData);
            bidResponses.push(bidResponse);
        } else {
            logInfo('AdvertiseX: no valid responses to interpret');
        }

        return bidResponses;
    },
};

registerBidder(spec);
