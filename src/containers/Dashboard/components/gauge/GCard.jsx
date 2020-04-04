import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { useStyles } from './gaugeStyles';

export default function GCard({ id, selected, title, children, onGaugeSelect }) {
  const classes = useStyles();
  const classNames = selected ? classes.card + " active" : classes.card;

  return (
    <Card tag="a" onClick={() => onGaugeSelect(id)} style={{ cursor: "pointer" }} className={classNames}>
      <CardHeader
        className={classes.header}
        avatar=" "
        title={title}
      />
      <CardContent className={classes.content}>
          {children}
      </CardContent>
    </Card>
  );
}