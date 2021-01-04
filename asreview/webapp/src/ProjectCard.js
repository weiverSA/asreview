import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';

import store from './redux/store'
import { setProject } from './redux/actions'
import { projectModes } from './globals.js';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100%",
  },
  content: {
    height: 140,
  },
  modeSimulate: {
    marginBottom: 4,
    backgroundColor: theme.palette.error.light
  },
  modeOracle: {
    marginBottom: 4,
    backgroundColor: theme.palette.warning.light,
  },
  modeExplore: {
    marginBottom: 4,
    backgroundColor: theme.palette.info.light,
  },
  description: {
    display: "-webkit-box",
    "-webkit-line-clamp": 3,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  }
}));


const ProjectCard = (props) => {
  const classes = useStyles();

  // define classes
  const modeColors = {
     [projectModes.ORACLE]: classes.modeOracle,
     [projectModes.EXPLORATION]: classes.modeExplore,
     [projectModes.SIMULATION]: classes.modeSimulate,
  }

  const openExistingProject = () => {

    console.log("Opening existing project " + props.id)

    // set the state in the redux store
    store.dispatch(setProject(props.id))

    props.handleAppState("project-page")

  }

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={openExistingProject}
      >
        <CardContent
          className={classes.content}
        >
          <Chip
            size="small"
            label={props.mode}
            className={props.mode && modeColors[props.mode]}
          />
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.description}
          >
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProjectCard;
