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
      <Row flex="flex" justify="start">
        <Col span={6}>
          <Avatar src={props.cocktail.strDrinkThumb} size={250} shape="square"/>
        </Col>
        <Col span={10}>
          <Row>
            <Title level={4}>{props.cocktail.strDrink}</Title>
          </Row>
          <Row>
            <Paragraph>
              {ingredientList.map((ingredient, index) => <Row key={index}>{ingredient}</Row>)}
            </Paragraph>
          </Row>
          <Row>
            <Paragraph>
              <Text strong>Instructions:</Text>
            </Paragraph>
            <Paragraph>
              {props.cocktail.strInstructions}
            </Paragraph>
          </Row>
        </Col>
        <Divider />
      </Row>
    </React.Fragment>
  )
}