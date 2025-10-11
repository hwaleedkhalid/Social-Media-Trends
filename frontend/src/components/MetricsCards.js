import React from 'react';

const MetricsCards = ({ data }) => {
  const { total_tweets, sentiment_distribution } = data;

  return (
    <div className="row mt-3">
      <div className="col-md-3 mb-3">
        <div className="card text-white bg-primary h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title display-6">{total_tweets}</h5>
                <p className="card-text">Total Tweets</p>
              </div>
              <div className="align-self-center">
                <i className="fas fa-twitter fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card text-white bg-success h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title display-6">{sentiment_distribution.positive}</h5>
                <p className="card-text">Positive</p>
              </div>
              <div className="align-self-center">
                <i className="fas fa-smile fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card text-white bg-warning h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title display-6">{sentiment_distribution.neutral}</h5>
                <p className="card-text">Neutral</p>
              </div>
              <div className="align-self-center">
                <i className="fas fa-meh fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-3 mb-3">
        <div className="card text-white bg-danger h-100">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <div>
                <h5 className="card-title display-6">{sentiment_distribution.negative}</h5>
                <p className="card-text">Negative</p>
              </div>
              <div className="align-self-center">
                <i className="fas fa-frown fa-2x"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCards;