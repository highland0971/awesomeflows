import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';

import MessageIcon from 'material-ui-icons/QuestionAnswer';
import SendMailIcon from 'material-ui-icons/Send';
import AssignTaskIcon from 'material-ui-icons/Assignment';
import ShareIcon from 'material-ui-icons/Share';

const styles = theme => ({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        height: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    playIcon: {
        height: 38,
        width: 38,
    },
});

function ContactActionCard(props) {
    const { classes, theme } = props;

    return (
        <div>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={props.imgUrl}
                    title="Live from space album cover"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography type="headline">{props.name}</Typography>
                        <Typography type="subheading" color="secondary">
                            {props.email}
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <IconButton aria-label="Chat" onClick={event=>{
                            props.chat(props.name);

                        }}>
                            <MessageIcon/>
                        </IconButton>
                        <IconButton aria-label="SendMail">
                            <SendMailIcon/>
                        </IconButton>
                        <IconButton aria-label="NewTask">
                            <AssignTaskIcon />
                        </IconButton>
                    </div>
                </div>

            </Card>
        </div>
    );
}

ContactActionCard.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ContactActionCard);