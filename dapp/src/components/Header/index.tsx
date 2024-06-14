import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as nearAPI from 'near-api-js';
import { ConnectConfig } from 'near-api-js';
import Image from 'next/image';
import profile from 'public/assets/profile.png';
import React, { MouseEvent, useEffect, useState } from 'react';

import styles from './Header.module.css';

import Logo from '../Logo';
import WalletButton from '../WalletButton';

type signInDetails = {
  name: string;
  photo: string;
};
export default function Header({
  signInDetails,
}: {
  signInDetails: signInDetails;
}) {
  const imageSize = 40;
  const { photo } = signInDetails;
  //   console.log('PHOTO', photo);
  const { keyStores, connect, WalletConnection } = nearAPI;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
  const connectionConfig: ConnectConfig = {
    networkId: 'testnet',
    keyStore: myKeyStore,
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    headers: {},
  };

  const nearWalletConnection = async () =>
    await connect(connectionConfig).then((nearConnection) => {
      const walletConnection = new WalletConnection(nearConnection, null);
      return walletConnection;
    });

  const [isWalletSignedIn, setIsWalletSignedIn] = useState<boolean>(false);

  const SignInToNear = async () => {
    const conn = await nearWalletConnection();
    if (!isWalletSignedIn) {
      conn.requestSignIn('monopolydao.testnet', 'MonopolyDAO');
      isWalletActive();
    }
    isWalletActive();
    return conn.signOut();
  };

  const isWalletActive = async () => {
    const conn = await nearWalletConnection();
    conn.isSignedIn() ? setIsWalletSignedIn(true) : setIsWalletSignedIn(false);
  };

  useEffect(() => {
    isWalletActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Logo color='black' />
        </div>
        <div className={styles.right}>
          <WalletButton type='contained' handleClick={SignInToNear}>
            {isWalletSignedIn ? (
              <>
                <span className={styles.connected}></span>Wallet connected
              </>
            ) : (
              <>
                <span className={styles.disconnected}></span>Connect wallet
              </>
            )}
          </WalletButton>
          <div className={styles.avatar} onMouseEnter={handleClick}>
            <Image
              src={photo || profile}
              width={imageSize}
              height={imageSize}
              alt='avatar'
              style={{ objectFit: 'contain' }}
            />
          </div>
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Account and Payments</MenuItem>
            <MenuItem>Log out</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
