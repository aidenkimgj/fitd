import React from 'react';
import { Button } from './Button';
import './Pricing.css';
import { FaFire } from 'react-icons/fa';
import { BsXDiamondFill } from 'react-icons/bs';
import { GiCrystalize } from 'react-icons/gi';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';

function Pricing({ events, firstName, lastName }) {
  const coachData = { events, firstName, lastName };
  return (
    <IconContext.Provider value={{ color: '#fff', size: 64 }}>
      <div className="pricing__section">
        <div className="pricing__wrapper">
          <h1 className="pricing__heading">Pricing</h1>
          <div className="pricing__container">
            <Link
              to={{
                pathname: `/checkout/silver`,
                state: {
                  membershipId: 1,
                  price: 8.99,
                  memberTier: 'Silver',
                  coachData,
                },
              }}
              className="pricing__container-card"
            >
              <div className="pricing__container-cardInfo">
                <div className="icon">
                  <FaFire />
                </div>
                <h3>Silver</h3>
                <h4>$8.99</h4>
                <p>per month</p>
                <ul className="pricing__container-features">
                  <li>100 Transactions</li>
                  <li>2% Cash Back</li>
                  <li>$10,000 Limit</li>
                </ul>
                <Button buttonSize="btn--wide" buttonColor="second">
                  Choose Plan
                </Button>
              </div>
            </Link>
            <Link
              to={{
                pathname: `/checkout/gold`,
                state: {
                  membershipId: 2,
                  price: 29.99,
                  memberTier: 'Gold',
                  coachData,
                },
              }}
              className="pricing__container-card"
            >
              <div className="pricing__container-cardInfo">
                <div className="icon">
                  <BsXDiamondFill />
                </div>
                <h3>Gold</h3>
                <h4>$29.99</h4>
                <p>per month</p>
                <ul className="pricing__container-features">
                  <li>1000 Transactions</li>
                  <li>3.5% Cash Back</li>
                  <li>$100,000 Limit</li>
                </ul>
                <Button buttonSize="btn--wide" buttonColor="second">
                  Choose Plan
                </Button>
              </div>
            </Link>
            <Link
              to={{
                pathname: `/checkout/diamond`,
                state: {
                  membershipId: 3,
                  price: 99.99,
                  memberTier: 'Diamond',
                  coachData,
                },
              }}
              className="pricing__container-card"
            >
              <div className="pricing__container-cardInfo">
                <div className="icon">
                  <GiCrystalize />
                </div>
                <h3>Diamond</h3>
                <h4>$99.99</h4>
                <p>per month</p>
                <ul className="pricing__container-features">
                  <li>Unlimited Transactions</li>
                  <li>5% Cash Back</li>
                  <li>Unlimited Spending</li>
                </ul>
                <Button buttonSize="btn--wide" buttonColor="second">
                  Choose Plan
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
}
export default Pricing;
