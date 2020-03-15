import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { grey, blue } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    height: 250
  },
  link:{
    height: 24
  },
  header:{
    backgroundColor: grey[200]
  },
  content:{
      padding: '10px 0px !important',
      textAlign: 'center'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[700],
  },
}));

export default function GCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        avatar=" "
        title={props.title}
      />
      <CardContent className={classes.content}>
          {props.children}
      </CardContent>
    </Card>
  );
}