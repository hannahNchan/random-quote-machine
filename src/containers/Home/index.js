import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

import api from '../../api';
import getRandomInt from '../../utils/getRandomInt';

import './styles.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'table-cell',
    verticalAlign: 'middle',
  },
  quote: {
    font: 'oblique 100% cursive',
    fontSize: 'xxx-large',
  },
}));

const App = () => {
  const classes = useStyles();
  const [quotesResult, setQuotesResult] = useState([]);
  const [quoteResult, setQuoteResult] = useState({});
  const [checked, setChecked] = useState(true);

  const getRandomQuote = items => {
    const arrayQuotesLength = items.length;
    const randomNumber = getRandomInt(0, arrayQuotesLength);
    return items[randomNumber];
  };

  useEffect(() => {
    (async () => {
      const { quotes } = await api();
      setQuotesResult(quotes); 
      const getQuote = getRandomQuote(quotes);
      setQuoteResult(getQuote);
    })();
  },[]);

  const loadAnotherQuote = () => {
    setChecked(false);
    const newQuote = getRandomQuote(quotesResult);
    setQuoteResult(newQuote);
    setChecked(true);
  };

  return (
    <div id="quote-box">
      <div className={classes.root}>
        <div className="hannah-inner">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Fade in={checked}>
                <Typography className={classes.quote} variant="h3" gutterBottom>
                  {quoteResult.quote ? quoteResult.quote : ''}
                </Typography>
              </Fade>  
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <Typography variant="subtitle1" gutterBottom align="right" id="author">
                {quoteResult.author ? quoteResult.author : ''}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <IconButton 
                color="primary" 
                id="tweet-quote" 
                aria-label="Tweet" 
                href="https://twitter.com/intent/tweet"
                target="_blank"
              >
                <TwitterIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={6} className="hannah-right">
              <Button 
                id="new-quote" 
                variant="contained" 
                size="large"
                color="primary"
                onClick={() => loadAnotherQuote()}
              >
                New Quote
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default App;
