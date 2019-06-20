import React from 'react';
import { Row, Col, Avatar, Divider, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function Drink(props) {
  const ingredientList = [];
  for (let i = 1; i < 16; i++) {
    if (props.cocktail[('strIngredient' + i)]) {
      ingredientList.push(props.cocktail[('strMeasure' + i)] + ' ' + props.cocktail[('strIngredient' + i)]);
    }
  }
  return (
    <React.Fragment>
      <Row type="flex" justify="start" align="middle">
        <Col span={6}>
          <Avatar src={props.cocktail.strDrinkThumb} size={300} shape="square"/>
        </Col>
        <Col span={10}>
          <Row type="flex" align="top">
            <Title level={4}>{props.cocktail.strDrink}</Title>
          </Row>
          <Row type="flex">
            <Paragraph>
              {ingredientList.map((ingredient, index) => <Row key={index}>{ingredient}</Row>)}
            </Paragraph>
          </Row>
          <Row type="flex">
              <Text strong>Instructions: </Text>
          </Row>
          <Row type="flex" align="top">
            {props.cocktail.strInstructions}
          </Row>
        </Col>
        <Divider />
      </Row>
    </React.Fragment>
  )
}