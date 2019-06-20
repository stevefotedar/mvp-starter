import React from 'react';
import Drink from './drink.jsx';
import { Typography } from 'antd';

const { Title } = Typography;

export default function Drinks (props) {
  if (props.cocktails.length === 0 && !props.sent) {
    return (
      <Title level={3}>
        Please input some cocktail ingredients...
      </Title>
    )
  } else if (props.mallort) {
    return (
      <Title level={2}>
        GO HOME JACOB!!!!
      </Title>
    )
  } else if (props.cocktails.length === 0 && props.sent) {
    return (
      <Title level={3}>
        No cocktails found!
      </Title>
    )
  } else {
    return (
      <React.Fragment>
        {props.cocktails.map(cocktail => <Drink key={cocktail.idDrink} cocktail={cocktail} />)}
      </React.Fragment>
    )
  }
} 