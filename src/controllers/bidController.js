const bids = [
    {
        bidId: 1,
        cpm: 3.5764,
        width: 300,
        height: 250,
        creativeId: "advertisex-1",
        ad: `
      <div class="w-80 h-64 ml-auto mr-auto p-4 bg-white border border-black rounded-md">
        <h4 class="text-center">John Doe</h4>
        <p class="text-center">Gender: Male</p>
        <p class="text-center">Age: 29</p>
      </div>
    `,
    },
    {
        bidId: 2,
        cpm: 2.4231,
        width: 728,
        height: 90,
        creativeId: "advertisex-2",
        ad: `
      <div class="w-80 h-64 ml-auto mr-auto p-4 bg-gray-200 border border-black rounded-md">
        <h4 class="text-center">Jane Smith</h4>
        <p class="text-center">Gender: Female</p>
        <p class="text-center">Age: 34</p>
      </div>
    `,
    },
    {
        bidId: 3,
        cpm: 4.1234,
        width: 300,
        height: 250,
        creativeId: "advertisex-3",
        ad: `
      <div class="w-80 h-64 ml-auto mr-auto p-4 bg-white border border-black rounded-md">
        <h4 class="text-center">Alice Johnson</h4>
        <p class="text-center">Gender: Female</p>
        <p class="text-center">Age: 25</p>
      </div>
    `,
    },
    {
        bidId: 4,
        cpm: 3.7891,
        width: 300,
        height: 250,
        creativeId: "advertisex-4",
        ad: `
      <div class="w-80 h-64 ml-auto mr-auto p-4 bg-white border border-black rounded-md">
        <h4 class="text-center">Bob Brown</h4>
        <p class="text-center">Gender: Male</p>
        <p class="text-center">Age: 45</p>
      </div>
    `,
    },
];

const getAdvertisexBid = (req, res) => {
    try {
        res.json(bids[0]);
    } catch (error) {
        console.error('Error handling /getAdvertisexBid request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAnotherBid = (req, res) => {
    try {
        res.json(bids[2]);
    } catch (error) {
        console.error('Error handling /getAnotherBid request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllBids = (req, res) => {
    try {
        res.json(bids);
    } catch (error) {
        console.error('Error handling /bids request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAdvertisexBid, getAnotherBid, getAllBids };
