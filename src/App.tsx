import React from 'react';
import {useEffect} from "react";
import './App.css';
import ClickPage from "./ClickPage";
import Navbar from "./Navbar";
import ProfilePage from "./ProfilePage";
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import HotDeals from "./HotDeals";
import BoostPage from "./BoostPage";
import {TonConnectUIProvider} from "@tonconnect/ui-react";
import MembershipPage from "./MembershipPage";

function App() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

    }, []);
  return (
      <TonConnectUIProvider manifestUrl="https://t.me/GamGamAppBot/GamGamApp/tonconnect-manifest.json"
                            walletsListConfiguration={{
                                includeWallets: [
                                    {
                                        appName: "tonwallet",
                                        name: "TON Wallet",
                                        imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
                                        aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
                                        universalLink: "https://wallet.ton.org/ton-connect",
                                        jsBridgeKey: "tonwallet",
                                        bridgeUrl: "https://bridge.tonapi.io/bridge",
                                        platforms: ["chrome", "android"]
                                    }
                                ]
                            }}>
          <Router>
              <div className="App">
                  <div className="content">
                      <Routes>
                          <Route path="/" element={<ClickPage/>}></Route>
                          <Route path="/profile" element={<ProfilePage/>}></Route>
                          <Route path="/deals" element={<HotDeals></HotDeals>}></Route>
                          <Route path="/boosts" element={<BoostPage></BoostPage>}></Route>
                          <Route path="/membership" element={<MembershipPage></MembershipPage>}></Route>
                      </Routes>
                  </div>
                  <Navbar></Navbar>
              </div>
          </Router>
      </TonConnectUIProvider>

  );
}
export default App;
