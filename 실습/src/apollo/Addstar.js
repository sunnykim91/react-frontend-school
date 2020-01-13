import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_STAR } from './graphql/mutations';

const Addstar = () => {
  const [addStar, { loading, error }] = useMutation(ADD_STAR); // addStar mutation을 실제로 수행하게하는 함수
  return (
    <div>
      <button
        onClick={() => {
          addStar({
            variables: {
              repoid: id
            }
          });
        }}
      ></button>
    </div>
  );
};
