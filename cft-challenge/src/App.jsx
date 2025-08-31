import { useEffect, useState } from "react"
import './index.css';

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