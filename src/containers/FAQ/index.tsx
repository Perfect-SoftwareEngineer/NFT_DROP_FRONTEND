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
                Got a question? We're here to answer! If you don't see your answer here, contact us through our Discord.
            </Typography>
            <Stack spacing={2} marginTop={6}>
                <FAQItem title="What is the Curry Counter and how does it work?">
                    <Typography fontSize={16} fontWeight={400}>
                        Score to Mint is an interactive fan tool to reward the biggest Stephen Curry fans as he battles
                        his way through the NBA playoffs. The premise is simple: for every 3-pointer Curry makes in a
                        playoff game, three free digital basketballs are claimable by the most engaged fans. Score to
                        Mint kicks off the next iteration of Curry Brand's effort to create the most positive basketball
                        community of all time, championed by the greatest shooter of all time.<br></br>
                        <br></br>Only one claim per wallet
                    </Typography>
                </FAQItem>
                <FAQItem title="How to mint">
                    <Typography fontSize={16} fontWeight={400}>
                        As each Basketball is an NFT, you'll need a blockchain wallet to get started. Don't worry - this
                        is as simple as downloading the MetaMask extension in your browser and creating a MetaMask
                        wallet. Once you have your Metamask wallet, head over to headz.currybrand.com and connect your
                        wallet. Once your wallet is connected, click “Reserve” to reserve your spot to mint a Basketball
                        NFT.
                    </Typography>
                </FAQItem>
                <FAQItem title="What is reserve minting?">
                    <Typography fontSize={16} fontWeight={400}>
                        We chose to build a reserve mechanism to ensure everyone has a fair chance of claiming a
                        Basketball. Also in the interest of avoiding costly gas wars for users, reserving a Basketball
                        is a gasless transaction. You simply need to connect your wallet and click “Reserve” faster than
                        everyone else to claim your spot to reserve a free Basketball.<br></br>
                        <br></br>If you've successfully reserved a Basketball, you'll receive a success message. Simply
                        come back to the site at the end of the game to claim your free NFT. Note that if you've
                        successfully reserved a Basketball, you can claim your NFT at a later date at any time. Claiming
                        your NFT will incur gas fees, which usually ranges from $7-$25 worth of Ethereum. If you click
                        “Reserve” but an error message is displayed, someone else beat you to the punch. Come back the
                        next time Steph Curry scores for the chance to reserve your Basketball again.
                    </Typography>
                </FAQItem>
                <FAQItem title="Buying, Selling, Trading, and Refunds">
                    <Stack spacing={3}>
                        <Stack spacing={1}>
                            <Typography fontSize={16} fontWeight={700}>
                                Can I sell my Basketball?
                            </Typography>
                            <Typography fontSize={16} fontWeight={400}>
                                Yes! You will be able to sell your Basketball on Opensea. We are using Opensea so users
                                can buy, sell, and trade to and from other users. Please note that when you buy and sell
                                on these exchanges, you are solely responsible for your Basketball and must abide by the
                                rules and risks of using the platform.
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography fontSize={16} fontWeight={700}>
                                What if I didn't get a Basketball? Can I buy it somewhere else?
                            </Typography>
                            <Typography fontSize={16} fontWeight={400}>
                                Yes! You will be able to buy Basketball on Opensea off the secondary market from other
                                users. We are using the Opensea platform so users can buy from other users directly.
                                Please note that when you buy and sell on these exchanges, you are solely responsible
                                for your Basketball and must abide by the rules and risks of using the platform. Click
                                the Opensea icon to be directed to our secondary market collection.
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography fontSize={16} fontWeight={700}>
                                What is Opensea?
                            </Typography>
                            <Typography fontSize={16} fontWeight={400}>
                                Opensea is an NFT marketplace where users can buy, trade, and sell their NFTs. We are
                                partnering with Opensea to allow our users to safely trade their Basketball. Please
                                visit opensea.io for more details.
                            </Typography>
                        </Stack>
                        <Stack spacing={1}>
                            <Typography fontSize={16} fontWeight={700}>
                                Will I be able to refund my Basketball?
                            </Typography>
                            <Typography fontSize={16} fontWeight={400}>
                                After a successful transaction, you will not be able to refund your Basketball.
                            </Typography>
                        </Stack>
                    </Stack>
                </FAQItem>
                <FAQItem title="What if I'm a Genesis Curry Flow Holder?">
                    <Typography fontSize={16} fontWeight={400}>
                        Please wait for future updates. We have not forgotten about our GCF holders.
                    </Typography>
                </FAQItem>
            </Stack>
        </Container>
    );
};

export default FAQPageContainer;
