import ReactComponent from './ReactComponent';

function App() {
  return (
    <div className="container-div">
      <ReactComponent input={undefined}/>
      <ReactComponent input={["hello", "world", "testing"]}/>
      <ReactComponent input={"hello"}/>
    </div>
  );
}

export default App;
