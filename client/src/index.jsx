import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import IngredientForm from './components/ingredientform.jsx';
import { Row, Col } from 'antd';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      cocktails:[]
    };
    this.submitIngredients = this.submitIngredients.bind(this);
  }

  submitIngredients(list) {
    Axios.get('/api/cocktails', {
      params: {booze: list.join(',')}
    })
      .then(results => {
        this.setState({ cocktails: results.data.drinks, ingredients: list});
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={18} push={6}>
            <Row>
              Row 1
            </Row>
            <Row>
              Row 2
            </Row>
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