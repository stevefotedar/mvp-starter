import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import IngredientForm from './components/ingredientform.jsx';
import { Row, Col, BackTop } from 'antd';
import Drinks from './components/drinks.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      cocktails: [],
      sent: false,
      mallort: false,
    };
    this.submitIngredients = this.submitIngredients.bind(this);
  }

  submitIngredients(list) {
    if (list.includes('Mallort') || (list.includes('mallort'))) {
      this.setState({ sent: true, mallort: true });
    } else {
      Axios.get('/api/cocktails', {
        params: {booze: list.join(',')}
      })
        .then(results => {
          console.log(results.data);
          this.setState({ cocktails: results.data, ingredients: list, sent: true, mallort: false });
        })
        .catch((err) => {
          this.setState({sent: true, cocktails: [], mallort: false});
          // alert('No cocktails found');
          console.log(err);
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <BackTop />
        <Row>
          <Col span={18} push={6}>
            <Drinks cocktails={this.state.cocktails} sent={this.state.sent} mallort={this.state.mallort}/>
          </Col>
          <Col span={6} pull={18}>
            <IngredientForm submitIngredients={this.submitIngredients}/>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));