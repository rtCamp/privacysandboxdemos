function log(label, o) {
  console.debug(label, JSON.stringify(o, ' ', ' '));
}

function generateBid(
  interestGroup,
  auctionSignals,
  perBuyerSignals,
  trustedBiddingSignals,
  browserSignals
) {
    var bidCPM = Math.floor(Math.random() * 100, 10);
    var ad = interestGroup.ads[Math.floor(Math.random()*interestGroup.ads.length)];

    log('generateBid', {
    bidCPM,
    interestGroup,
    auctionSignals,
    perBuyerSignals,
    trustedBiddingSignals,
    browserSignals
  });

  console.groupCollapsed( "%c PAAPI DSP1 %c generateBid %c IG:%s => BID:%d", "color: green;  background-color:orange; border: 1px solid black", "color: purple; border:1px solid black", "", interestGroup.name, bidCPM);
//		console.group('interestGroup');
			console.log( 'owner: %s', interestGroup.owner );
			console.log( 'name: %s', interestGroup.name );
//		console.groupEnd();

//		console.group('fledge bid');
			console.log( 'CPM: %d', bidCPM );
			console.log( 'creativeURL: %s', ad.renderUrl );
			console.log( 'metadata: %o', ad.metadata );
//		console.groupEnd();

//		console.groupCollapsed('browserSignals');
			console.log( 'topWindowHostname: %s', browserSignals.topWindowHostname );
			console.log( 'seller: %s', browserSignals.seller );
			console.log( 'topLevelSeller: %s', browserSignals.topLevelSeller );
//		console.groupEnd();
		console.log( 'perBuyerSignals: %o', perBuyerSignals );
		console.log( 'trustedBiddingSignals: %o', trustedBiddingSignals );
	console.groupEnd();

  var debug = '&winningBid=${winningBid}&winningBidCurrency=${winningBidCurrency}&topLevelWinningBid=${topLevelWinningBid}&topLevelWinningBidCurrency=${topLevelWinningBidCurrency}&rejectReason=${rejectReason}';
  var bidDetails = '&seller=' + browserSignals.seller;
  var queryString = bidDetails + debug;

  forDebuggingOnly.reportAdAuctionWin( interestGroup.owner + '//dsp/forDebuggingOnly?type=reportAdAuctionWin' + queryString );
  forDebuggingOnly.reportAdAuctionLoss( interestGroup.owner + '//dsp/forDebuggingOnly?type=reportAdAuctionLoss' + queryString );

  return {
    ad: ad.metadata,
    bid: bidCPM,
	bidCurrency:'USD',
	render: ad.renderUrl,
    allowComponentAuction: true,
  };
}

function reportWin(
  auctionSignals,
  perBuyerSignals,
  sellerSignals,
  browserSignals,
  directFromSellerSignals
) {
	console.groupEnd();
	console.groupCollapsed( "%c PAAPI DSP1 %c reportWin %c IG:%s => BID:%d", "color: green;  background-color:orange; border: 1px solid black", "color: purple; border:1px solid black", "", browserSignals.interestGroupName, browserSignals.bid);
		console.log( 'bid: %d', browserSignals.bid );
		console.log( 'highestOtherBid: %d', browserSignals.highestScoringOtherBid );

		console.log( 'sellerSignals: %o', sellerSignals);

		console.groupCollapsed('browserSignals');
			console.log( 'topWindowHostname: %s', browserSignals.topWindowHostname );
			console.log( 'seller: %s', browserSignals.seller );
			console.log( 'topLevelSeller: %s', browserSignals.topLevelSeller );
		console.groupEnd();
	console.groupEnd();

  log('reportWin', {
    auctionSignals,
    perBuyerSignals,
    sellerSignals,
    browserSignals,
    directFromSellerSignals
  });
  sendReportTo(browserSignals.interestGroupOwner + '//dsp/reporting?report=win' + '&domain='+browserSignals.topWindowHostname + '&igName='+browserSignals.interestGroupName + '&winningBid='+browserSignals.bid + '&seller='+browserSignals.seller + '&renderURL='+browserSignals.renderUrl + '&interestGroupName='+browserSignals.interestGoupName + '&made='+browserSignals.madeHighestScoringOtherBid + '&otherBid='+browserSignals.highestScoringOtherBid);
}
