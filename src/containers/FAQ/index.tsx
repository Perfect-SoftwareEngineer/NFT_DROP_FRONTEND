import React from 'react';
import { Stack, Typography } from '@mui/material';
import Container from '../Container';
import FAQItem from '../../components/FAQ/FAQItem';

const FAQPageContainer: React.FC = (): JSX.Element => {
    return (
        <Container sx={{ paddingY: 8 }}>
            <Typography
                fontSize={48}
                fontWeight={800}
                lineHeight={1.2}
                textTransform="uppercase"
                className="neueplak_condensed"
            >
                Frequently Asked Questions
            </Typography>
            <Typography width={{ xs: '80%', md: '35%' }} marginTop={3}>
                Got a question? We're here to answer! If you don't see your answer here, contact us through our{' '}
                <a href="https://discord.gg/currybrand" target="_blank" style={{ color: '#FFCA21' }}>
                    Discord
                </a>
                .
            </Typography>
            <Stack spacing={2} marginTop={6}>
                <FAQItem title="How does the Mixology Room work?">
                    <Typography lineHeight={1.3}>
                        STEP 1: SELECT AN NF3 BASKETBALL
                        <br />
                        <br />
                        The NF3 basketball does not hold any community traits, but it can still produce an avatar
                        without any serums.
                        <br />
                        <br />
                        STEP 2: SELECT UP TO 3 SERUMS
                        <br />
                        <br />
                        Choose up to 3 community serums to apply to your avatar - the order of Serum selection does not
                        impact final outcome. Each Serum guarantees one trait, with a possibility of two.
                        <br />
                        <br />
                        STEP 3: FUSE
                        <br />
                        <br />
                        Make sure you have selected the NF3 Basketball and community partner serums that you would like
                        to apply to your avatar. Fusing is an irreversible action that will burn your selected NFTs, so
                        be sure to double-check. When you are ready, click Fuse.
                    </Typography>
                </FAQItem>
                <FAQItem title="What happens to my NF3 Basketball and Serums after I fuse them?">
                    <Typography>
                        You have created a Basketball Headz Avatar! You will not see your Basketball Headz Avatar
                        immediately. Please wait up to 48 hours for the metadata to load.
                    </Typography>
                </FAQItem>
                <FAQItem title="What is the one-time approval for?">
                    <Typography>
                        You must approve this smart contract interaction to use the Mixology Room. It is a one-time
                        approval that confirms the interaction between the smart contract and the token. There will be a
                        gas fee.
                    </Typography>
                </FAQItem>
                <FAQItem title="What are Serums?">
                    <Typography>
                        With the launch of Curry partner Serums, we go from changing the game to mutating the game. Our
                        Serums, from some of the most exciting communities in the Metaverse, are designed to produce
                        some truly game-winning results when brought together with the Curry NF3 Basketball. While the
                        traits are transparent, how they mutate is really the fun part of this project, adding rarity,
                        collectability, and surprise. So how will you mutate the game?
                    </Typography>
                </FAQItem>
                <FAQItem title="What kinds of Serums are Available?">
                    <Typography>
                        <b>Genesis Curry Flow Serums</b> <i>(Genesis Curry Flow Snapshot Wallets only)</i>: 2974 Total
                        Supply
                        <br />
                        Unanimous Serum
                        <br />
                        Broken History Serum
                        <br />
                        Flow Serum
                        <br />
                        Warp Serum
                        <br />
                        The Lab Serum
                        <br />
                        <br />
                        <b>Community Serums</b>
                        <br />
                        Smilesss Serum: 6000 Total Supply
                        <br />
                        Chibi Dinos Serum: 6000 Total Supply
                        <br />
                        HAPE Serum: 6000 Total Supply
                        <br />
                        CyberKongz Serum: 6000 Total Supply
                        <br />
                        Under Armour Serum: 6000 Total Supply
                        <br />
                        Curry Brand Serum: 6000 Total Supply
                    </Typography>
                </FAQItem>
                <FAQItem title="What is an NFT?">
                    <Typography>
                        NFT are ”non-fungible tokens” — a fancy way of saying it's a unique, one-of-a-kind digital item
                        that users can buy, own, and trade. Some NFTs' primary functions are digital art and looking
                        cool; some offer additional utility, like exclusive access to websites or participation in an
                        event.
                    </Typography>
                </FAQItem>
                <FAQItem title="What is Reserve Minting?">
                    <Typography>
                        To avoid “gas wars,” you may press “Reserve” during the public mint to trigger a transaction
                        where you pay for the amount of NFTs you specify. This will allow you to mint your reserved NFTs
                        at a later time. There are no time limits for when you can mint your reserved NFTs.
                    </Typography>
                </FAQItem>
                <FAQItem title="I am a Genesis Curry Flow holder, what happens next?">
                    <Typography>
                        For our long term Genesis Curry Flow holders, we will reward free NF3 Basketball claims. A
                        snapshot will take place on June 9th at 4:00:00 PST, and all of those who have the Genesis Curry
                        Flows in their wallet will be registered to claim on June 9th at 5:00:00 PST. We will give
                        holders 48 hours to claim their free mints.
                        <br></br>
                        <br></br>
                        If you have more than one Genesis Curry Flow, you will be able to claim the same amount of NF3
                        Basketballs as the number of Genesis Curry Flows in your wallet.
                    </Typography>
                </FAQItem>
                <FAQItem title="What is a snapshot?">
                    <Typography>
                        A snapshot is a record of wallet addresses that have been collected at a given time. It is used
                        to claim for those who own the Genesis Curry Flows. If you are interested in claiming, make sure
                        to keep the snapshot time in mind when purchasing the Genesis Curry Flows.
                    </Typography>
                </FAQItem>
                <FAQItem title="What is a mintlist?">
                    <Typography>
                        To be on a mintlist means that your Metamask wallet is pre-approved to mint within a predefined
                        time. This is done to prevent a gas war. If you do not mint within the timeframe, your mintlist
                        placement returns to the public mint. Essentially, mintlist participants will be able to
                        purchase before everyone else!
                    </Typography>
                </FAQItem>
                <FAQItem title="I can't find my NFT after claiming/airdrop. Where is it?">
                    <Typography>
                        Once you have claimed and cannot find it in your Opensea wallet, please check your hidden tab
                        for your claim. If it is not there, please contact the Luna Support Team.
                    </Typography>
                </FAQItem>
                <FAQItem title="What is the NF3 Counter?">
                    <Typography>
                        NF3 Counter is an interactive fan tool to reward the biggest Stephen Curry fans as he battles
                        his way through the Playoffs. The premise is simple: for every three-pointer, Curry makes in a
                        playoff game, three free digital Basketballs are claimable by the most engaged fans. Score to
                        Mint kicks off the next iteration of Curry Brand’s effort to create the most positive Basketball
                        community of all time, championed by the greatest shooter of all time.
                    </Typography>
                </FAQItem>
                <FAQItem title="How does the NF3 Counter work? Step by Step Guide">
                    <Typography>
                        For every 3-pointer Curry makes in a playoff game, three free digital basketballs are claimable
                        by the most engaged fans.
                        <br></br>
                        <br></br>
                        Step 1: Connect your MetaMask Wallet to the site.
                        <br></br>
                        Step 2: Go to “Reserve an NF3 Basketball”.
                        <br></br>
                        Step 3: When a Basketball is available to Reserve, click “Agree to Terms & Conditions” and then
                        press “Reserve.”
                        <br></br>
                        Step 4: Scroll down to “NF3 Basketball Winners” to check whether you have successfully reserved
                        a Basketball.
                        <br></br>
                        Step 5: If you were successful, please scroll down to “NF3 Counter” and click “Claim” one hour
                        after the game.
                        <br></br>
                        <i>Please note: It will take around an hour before you can claim your NF3 Basketball.</i>
                    </Typography>
                </FAQItem>
                <FAQItem title="What does “Reserve” do on the NF3 Counter Page?">
                    <Typography>
                        The reserve button will activate when Curry scores a three-pointer during the Playoffs. The user
                        that first clicks “Reserve” will have a free Basketball NFT reserved to claim after the game.
                        <br></br>
                        <br></br>
                        <i>
                            Please note: Even if you successfully reserve a Basketball, it may take some time for the
                            information to be updated due to the backend system updating all the details.
                        </i>
                    </Typography>
                </FAQItem>
                <FAQItem title="What does Claiming mean?">
                    <Typography>
                        Claiming means that you can own the Basketball NFT. When you click “Reserve” and succeed, we are
                        just reserving your Basketball for you so that you can fully claim it afterward. Users may Claim
                        the Basketball NFT whenever they like.
                        <br></br>
                        <br></br>
                        <i>
                            Please Note: You will need enough Ethereum in your wallet to pay for the gas fee.
                            <br></br>
                            (To pay less gas, track gas prices using{' '}
                            <a href="https://etherscan.io/gastracker" target="_blank" style={{ color: '#FFCA21' }}>
                                https://etherscan.io/gastracker
                            </a>
                            .)
                            <br></br>
                            The Gas fee is not something we can control.
                        </i>
                    </Typography>
                </FAQItem>
                <FAQItem title="How many NF3 Basketballs can I claim?">
                    <Typography>
                        There is only one Claim per wallet per game.
                        <br></br>
                        <br></br>
                        If you successfully reserve a Basketball NFT, you will not be able to further participate in
                        reserve until the next game.
                        <br></br>
                        If you were unsuccessful in reserving a Basketball NFT, you can continue to participate in
                        reserving a Basketball until you succeed.
                        <br></br>
                        <br></br>
                        <i>Please note: New game means a new start!</i>
                    </Typography>
                </FAQItem>
                <FAQItem title="What if I wasn't able to get an NF3 Basketball?">
                    <Typography>
                        There will be a general mint in the coming future. Follow our Twitter and join Discord to stay
                        posted.
                    </Typography>
                </FAQItem>
                <FAQItem title="Do I need a digital wallet to get a Basketball?">
                    <Typography>
                        Yes, you need a{' '}
                        <a href="https://metamask.io/download/" target="_blank" style={{ color: '#FFCA21' }}>
                            MetaMask
                        </a>{' '}
                        wallet to reserve and mint an NF3 Basketball! We recommend downloading it on your computer and
                        adding the extension for ease of reserving.
                    </Typography>
                </FAQItem>
                <FAQItem title="What blockchain is the NFT on?">
                    <Typography>It is on the Ethereum blockchain.</Typography>
                </FAQItem>
                <FAQItem title="Where can I get ETH cryptocurrency?">
                    <Typography>
                        You can purchase ETH using your native currency on an exchange platform, like Coinbase and
                        Gemini.
                    </Typography>
                </FAQItem>
                <FAQItem title="What is a gas fee?">
                    <Typography>
                        Gas fees are the transaction fees that users pay to have their transactions processed. On the
                        Ethereum blockchain, gas fees are paid using ETH cryptocurrency. The amount of gas you'll need
                        to pay to have your transaction processed depends on the number of people trying to process
                        transactions. There are websites where you can track gas prices, such as{' '}
                        <a href="https://etherscan.io/gastracker" target="_blank" style={{ color: '#FFCA21' }}>
                            https://etherscan.io/gastracker
                        </a>
                        .
                    </Typography>
                </FAQItem>
                <FAQItem title="Selling, Trading, and Refunds">
                    <Typography>
                        Can I sell my NF3 Basketball?
                        <br></br>
                        Yes! You will be able to sell your NF3 Basketball on OpenSea. We are using OpenSea so users can
                        buy, sell, and trade to and from other users. Please note that when you buy and sell on these
                        exchanges, you are solely responsible for your NF3 Basketball and must abide by the rules and
                        risks of using the platform.
                        <br></br>
                        <br></br>
                        What if I didn't get an NF3 Basketball? Can I buy it somewhere else?
                        <br></br>
                        Yes! You will be able to buy NF3 Basketball on OpenSea off the secondary market from other
                        users. We are using the OpenSea platform so users can buy from other users directly. Please note
                        that when you buy and sell on these exchanges, you are solely responsible for your NF3
                        Basketball and must abide by the rules and risks of using the platform. Click the OpenSea icon
                        to be directed to our secondary market collection.
                        <br></br>
                        <br></br>
                        What is OpenSea?
                        <br></br>
                        <a href="https://opensea.io/" target="_blank" style={{ color: '#FFCA21' }}>
                            OpenSea
                        </a>{' '}
                        is an NFT marketplace where users can buy, trade, and sell their NFTs. We partner with OpenSea
                        to allow our users to trade their NF3 Basketball safely. Please visit opensea.io for more
                        details.
                        <br></br>
                        <br></br>
                        Will I be able to refund my NF3 Basketball?
                        <br></br>
                        After a successful transaction, you will not be able to refund your NF3 Basketball.
                    </Typography>
                </FAQItem>
                <FAQItem title="Where can I view my NFT after I minted it?">
                    <Typography>After minting, you can view your NFT in Opensea.</Typography>
                </FAQItem>
                <FAQItem title="As an Under Armour employee, can I use my UA Employee discount on this purchase?">
                    <Typography>
                        Unfortunately, UA Employee discount is not available on the purchase of the NF3 Basketball.
                    </Typography>
                </FAQItem>
                <FAQItem title="How can I get Support?">
                    <Typography>
                        You can join our{' '}
                        <a href="https://discord.gg/currybrand" target="_blank" style={{ color: '#FFCA21' }}>
                            Discord
                        </a>{' '}
                        and open up a Ticket or email us at{' '}
                        <a href="mailto:contact@lunamarket.io" target="_blank" style={{ color: '#FFCA21' }}>
                            contact@lunamarket.io
                        </a>
                        ! Also, follow our{' '}
                        <a href="https://twitter.com/bball_headz" target="_blank" style={{ color: '#FFCA21' }}>
                            Twitter
                        </a>{' '}
                        for real-time updates and announcements.
                    </Typography>
                </FAQItem>
            </Stack>
        </Container>
    );
};

export default FAQPageContainer;
