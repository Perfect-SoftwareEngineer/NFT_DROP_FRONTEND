import React from 'react';
import { Stack, Typography } from '@mui/material';
import Container from '../Container';
import FAQItem from '../../components/FAQ/FAQItem';

const FAQPageContainer: React.FC = (): JSX.Element => {
    return (
        <Container sx={{ paddingY: 8 }}>
            <Typography fontSize={48} fontWeight={700} lineHeight={1.2}>
                Frequently Asked Questions
            </Typography>
            <Typography width={{ xs: '80%', md: '35%' }} fontSize={16} fontWeight={400} marginTop={3}>
                Got a question? We're here to answer! If you don't see your answer here, contact us through our{' '}
                <a href="https://discord.com/invite/M5dZ2GJSpQ" target="_blank" style={{ color: '#FFCA21' }}>
                    Discord
                </a>
                .
            </Typography>
            <Stack spacing={2} marginTop={6}>
                <FAQItem title="What is an NFT?">
                    <Typography fontSize={16} fontWeight={400}>
                        NFT are ”non-fungible tokens” — a fancy way of saying it's a unique, one-of-a-kind digital item
                        that users can buy, own, and trade. Some NFTs' primary functions are digital art and looking
                        cool; some offer additional utility, like exclusive access to websites or participation in an
                        event.
                    </Typography>
                </FAQItem>
                <FAQItem title="What is the NF3 Counter?">
                    <Typography fontSize={16} fontWeight={400}>
                        NF3 Counter is an interactive fan tool to reward the biggest Stephen Curry fans as he battles
                        his way through the Playoffs. The premise is simple: for every three-pointer, Curry makes in a
                        playoff game, three free digital Basketballs are claimable by the most engaged fans. Score to
                        Mint kicks off the next iteration of Curry Brand's effort to create the most positive Basketball
                        community of all time, championed by the greatest shooter of all time.
                    </Typography>
                </FAQItem>
                <FAQItem title="How does the NF3 Counter work? Step by Step Guide">
                    <Typography fontSize={16} fontWeight={400}>
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
                        after the game. Please note: It will take around an hour before you can claim your NF3
                        Basketball.
                    </Typography>
                </FAQItem>
                <FAQItem title="What does “Reserve” do on the NF3 Counter Page?">
                    <Typography fontSize={16} fontWeight={400}>
                        The reserve button will activate when Curry scores a three-pointer during the Playoffs. The user
                        that first clicks “Reserve” will have a free Basketball NFT reserved to claim after the game.
                        <br></br>
                        <br></br>
                        Please note: Even if you successfully reserve a Basketball, it may take some time for the
                        information to be updated due to the backend system updating all the details.
                    </Typography>
                </FAQItem>
                <FAQItem title="What does Claiming mean?">
                    <Typography fontSize={16} fontWeight={400}>
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
                    <Typography fontSize={16} fontWeight={400}>
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
                <FAQItem title="What can I do with my NF3 Basketball?">
                    <Typography fontSize={16} fontWeight={400}>
                        We will announce more updates as we build the most fanatic basketball community ever! So don't
                        miss any updates by following us on Twitter and joining our Discord!
                    </Typography>
                </FAQItem>
                <FAQItem title="What if I wasn't able to get an NF3 Basketball?">
                    <Typography fontSize={16} fontWeight={400}>
                        There will be a general mint in the coming future. Follow our Twitter and join Discord to stay
                        posted.
                    </Typography>
                </FAQItem>
                <FAQItem title="Do I need a digital wallet to get a Basketball?">
                    <Typography fontSize={16} fontWeight={400}>
                        Yes, you need a{' '}
                        <a href="https://metamask.io/download/" target="_blank" style={{ color: '#FFCA21' }}>
                            MetaMask
                        </a>{' '}
                        wallet to reserve and mint an NF3 Basketball! We recommend downloading it on your computer and
                        adding the extension for ease of reserving.
                    </Typography>
                </FAQItem>
                <FAQItem title="What blockchain is the NFT on?">
                    <Typography fontSize={16} fontWeight={400}>
                        It is on the Ethereum blockchain.
                    </Typography>
                </FAQItem>
                <FAQItem title="Where can I get ETH cryptocurrency?">
                    <Typography fontSize={16} fontWeight={400}>
                        You can purchase ETH using your native currency on an exchange platform, like Coinbase and
                        Gemini.
                    </Typography>
                </FAQItem>
                <FAQItem title="What is a gas fee?">
                    <Typography fontSize={16} fontWeight={400}>
                        Gas fees are the transaction fees that users pay to have their transactions processed. On the
                        Ethereum blockchain, gas fees are paid using ETH cryptocurrency. The amount of gas you'll need
                        to pay to have your transaction processed depends on the number of people trying to process
                        transactions. There are websites where you can track gas prices, such as
                        https://etherscan.io/gastracker.
                    </Typography>
                </FAQItem>
                <FAQItem title="Selling, Trading, and Refunds">
                    <Typography fontSize={16} fontWeight={400}>
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
                        Will I be able to refund my NF3 Basketball? After a successful transaction, you will not be able
                        to refund your NF3 Basketball.
                    </Typography>
                </FAQItem>
                <FAQItem title="Where can I view my NFT after I minted it?">
                    <Typography fontSize={16} fontWeight={400}>
                        After minting, you can view your NFT in Opensea.
                    </Typography>
                </FAQItem>
                <FAQItem title="What if I'm a Genesis Curry Flow Holder?">
                    <Typography fontSize={16} fontWeight={400}>
                        Please wait for future updates. We have not forgotten about our GCF holders.
                    </Typography>
                </FAQItem>
                <FAQItem title="What happens if I have a Partner Shoe (Decentraland, Gala Games, Rumble Kong League, and The Sandbox)?">
                    <Typography fontSize={16} fontWeight={400}>
                        Please wait for future updates. We are working hard with our partners to award holders.
                    </Typography>
                </FAQItem>
                <FAQItem title="As an Under Armour employee, can I use my UA Employee discount on this purchase?">
                    <Typography fontSize={16} fontWeight={400}>
                        Unfortunately, UA Employee discount is not available on the purchase of the NF3 Basketball.
                    </Typography>
                </FAQItem>
                <FAQItem title="How can I get Support?">
                    <Typography fontSize={16} fontWeight={400}>
                        You can join our{' '}
                        <a href="https://discord.com/invite/M5dZ2GJSpQ" target="_blank" style={{ color: '#FFCA21' }}>
                            Discord
                        </a>{' '}
                        and open up a Ticket or email us at{' '}
                        <a href="mailto:contact@lunamarket.io" target="_blank" style={{ color: '#FFCA21' }}>
                            contact@lunamarket.io
                        </a>
                        ! Also, follow our{' '}
                        <a href="https://twitter.com/LunaMarketInc" target="_blank" style={{ color: '#FFCA21' }}>
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
