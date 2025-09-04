import { useEffect, useState } from "react"
import './index.css';

/*
Query selector to match this pattern:
https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/ramp-challenge-instructions/

<section data-id="92*">
  <article data-class="*45">
    <div data-tag="*78*">
      <b class="ref" value="VALID_CHARACTER"></b>
    </div>
  </article>
</section>

const myStr = "";

const sections = document.querySelectorAll('section[data-id^=92]')

//recall hasAttribute and getAttribute! 

Array.from(sections).forEach((section) => {
  const articles = section.querySelectorAll('article['data-class$=45']);
  articles.forEach((article) => {
    const divs = article.querySelectorAll('div[data-tag*=78]')
    divs.forEach((div) => {
      const bTag = div.querySelector('.ref')
      if (bTag.hasAttribute('value')) {
         myStr += bTag.getAttribute['value']
      }
    })
  })
})



*/

function App() {
  const [flag, setFlag] = useState(null); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [flagText, setFlagText] = useState([]);

  //On mount of component, useEffect will do fetch request:
  //Response is in text.
  //empty dependency array to indicate we'll load it in.
  useEffect(() => {
    // if we haven't received flag yet.
    if(!flag) {
      fetch("https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/7a6561")
      .then((res) => res.text())
      .then((textContent) => {
        setFlag(textContent);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      })
    }
  }, []);

  //This useEffect triggers once we have flag change, and loading change. 
  //IMPORTANT: don't include flagText in dependency array because that's what we're updating within this useEffect
  //Including it will cause a chain effect where we create separate intervals that end up executing in parallel, 
  //causing characters to get grouped together. 
  useEffect(() => {
    //Make sure we're no longer loading here.
    if (!loading && flag) {
      //We'll set our interval.
      const interval = setInterval(() => {
        //Every 500 ms, we'll update our flag text until we can't.
        setFlagText((currFlagText) => {
          //Once we no longer can't we,'ll clear our interval.
          if(currFlagText.length > flag.length) {
            clearInterval(interval);
          }
          //spread operator to destructure what we have, and append next character. This then gets set to flag text.
          //the length of current flag text becomes the index.
          return [...currFlagText, flag[currFlagText.length]]
        })
      }, 500); 
    }
  }, [flag, loading, flagText])
  
  if(loading) {
    return (
      <div>Loading</div>
    )
  }

  if(error) {
    return (
      <div>Error: {error}</div>
    )
  }

  return(
    <ul>
      {
        flagText.map((char, idx) => (
          <li key={idx}>{char}</li>
        ))
      }
    </ul>
  )
}

export default App;