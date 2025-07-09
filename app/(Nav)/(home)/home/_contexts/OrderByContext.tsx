'use client'
// contexts/OrderByContext.tsx
import React, { createContext, useReducer, useContext, use } from 'react';
import { ExplorePublicationsOrderByType } from '@lens-protocol/react-web';

// 定义状态类型
type StateType = {
  orderBy: ExplorePublicationsOrderByType;
};

// 定义动作类型
type ActionType = { type: 'SET_ORDER_BY'; payload: ExplorePublicationsOrderByType };

// 定义初始状态
const initialState: StateType = {
  orderBy: ExplorePublicationsOrderByType.LensCurated,
};

// 创建上下文
const OrderByContext = createContext<{ state: StateType; dispatch: React.Dispatch<ActionType> } | undefined>(undefined);

// Reducer函数
function orderByReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'SET_ORDER_BY':
      return { ...state, orderBy: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Provider组件
export const OrderByProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(orderByReducer, initialState);

  return <OrderByContext.Provider value={{ state, dispatch }}>{children}</OrderByContext.Provider>;
};

// 自定义Hook，简化上下文的使用
export function useOrderBy() {
  const context = useContext(OrderByContext);
  if (!context) {
    throw new Error('useOrderBy must be used within an OrderByProvider');
  }
  return context;
}
