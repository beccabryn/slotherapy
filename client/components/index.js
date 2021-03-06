/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {SplashPage} from './splashPage'
export {default as DailySetup} from './dailySetup'
export {default as Liked} from './liked'
export {default as Completed} from './completed'
export {default as CurrAlert} from './currAlert'
