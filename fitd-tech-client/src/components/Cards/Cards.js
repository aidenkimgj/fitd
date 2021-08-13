import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1 className='cards__h1'>Articles</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>

          <CardItem
              src='images/article-5.jpg'
              text='Graduated and confused? Questions to ask yourself to land a job'
              label='monster.ca'
              path='https://www.monster.ca/career-advice/article/Graduated-and-confused-Questions-to-ask-yourself-to-land-a-job'
            />

            <CardItem
              src='images/article-2.jpg'
              text='10 Ways Technology Is Changing Coaching Now And In The Future'
              label='forbes.com'
              path='https://www.forbes.com/sites/johnwelsheurope/2019/04/08/10-ways-technology-is-changing-coaching-now-and-in-the-future/?sh=5823b7bf7eab'
            />
            <CardItem
              src='images/article-6.jpg'
              text='11 technologies developers should explore now'
              label='infoworld.com'
              path='https://www.infoworld.com/article/3191260/11-technologies-developers-should-explore-now.html'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/article-3.jpg'
              text='How Canadian newcomers can land a new job in tech'
              label='theReview.com'
              path='https://dmz.ryerson.ca/the-review/how-canadian-newcomers-can-land-a-new-job-in-tech/'
            />
            <CardItem
              src='images/article-4.jpg'
              text='Canada job market analysis: Information Technology (IT)'
              label='arrivein.com'
              path='https://arrivein.com/career-ca/canada-job-market-analysis-information-technology-it/'
            />

            <CardItem
              src='images/article-1.jpg'
              text='Demonstrating the Impact of Coaching: How Technology Supports Measurement'
              label='trainingindustry.com'
              path='https://trainingindustry.com/articles/leadership/demonstrating-the-impact-of-coaching-how-technology-supports-measurement/'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;