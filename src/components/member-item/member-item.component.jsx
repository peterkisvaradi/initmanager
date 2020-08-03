import React from 'react';
import './member-item.styles.css';

const MemberItem = ({ member }) => {
  return <div>Party member {member.name}</div>;
};

export default MemberItem;
