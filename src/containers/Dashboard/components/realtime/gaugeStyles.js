import { makeStyles } from '@material-ui/core/styles';
import {blue, grey} from "@material-ui/core/colors";

export const useStyles = makeStyles(theme => ({
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