import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import IngredientForm from './components/ingredientform.jsx';
import { Row, Col, BackTop, Typography } from 'antd';
import Drinks from './components/drinks.jsx';

const { Title } = Typography;

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
      console.log(process.env.APP_URL)
      Axios.get(`${process.env.APP_URL}/api/cocktails`, {
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
        <Row type="flex" justify="center" align="middle">
          <Title level={1}>Cocktail Finder</Title>
        </Row>
        <BackTop />
        <Row type="flex">
          <Col span={19} push={5}>
            <Drinks cocktails={this.state.cocktails} sent={this.state.sent} mallort={this.state.mallort}/>
          </Col>
          <Col span={5} pull={19}>
            <IngredientForm submitIngredients={this.submitIngredients}/>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));