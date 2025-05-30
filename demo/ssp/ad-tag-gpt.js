const auctionConfig = {
  seller: seller,

  decisionLogicUrl: `${seller}/ssp/decision-logic.js`,

  interestGroupBuyers: [
    buyer,
  ],
 
  trustedScoringSignalsUrl: `${seller}/ssp/kv.json`,

  auctionSignals: { auction_signals: 'auction_signals' },

	sellerSignals: {
		floor: 34,
		auctionID: 'id_' + Math.round(Math.random() * 1000000),
		divId: 'ad-container',
		adType: 'image',
		size: [300, 250],
		isFencedFrame: true
	},

  perBuyerSignals: {
    [`${buyer}`]: {
      per_buyer_signals: 'per_buyer_signals',
    },
  },
};
var auctionSlot;
var adUnitCode;
adUnitCode = "/22657645226/multiseller-demo";

window.googletag = window.googletag || { cmd: [] };
window.googletag.cmd.push(function () {
	auctionSlot = window.googletag
		.defineUnit(
			adUnitCode,
			[300, 250],
			"ad-div-fledge"
		)
		.addService(window.googletag.pubads());

	auctionSlot.setConfig({
		componentAuction: [
			{
				configKey: seller,
				auctionConfig: auctionConfig,
			},
		],
	});

	window.googletag.pubads().enableSingleRequest();
	window.googletag.pubads().disableInitialLoad();
	window.googletag.enableServices();
});
      googletag.cmd.push(function() {
	      googletag.pubads().addEventListener('slotRenderEnded',
		      (event) => {
			const slot = event.slot;
			console.group(
			      'Slot', slot.getSlotElementId(), 'finished rendering.');
		       }
		      );
	      googletag.display('ad-div-fledge');
    });

document.addEventListener("DOMContentLoaded", async (e) => {
  if (!navigator.runAdAuction) {
      result.innerText =
	"runAdAuction doesn't exist. Please enable the flags at chrome://flags/#privacy-sandbox-ads-apis";
    }
});

function refreshSlot() {
	googletag.pubads().refresh([auctionSlot]);
}

var b = document.createElement('button');
b.innerHTML = 'runAdAuction';
b.style = 'display: block';
b.onclick = refreshSlot;
document.body.appendChild(b);
