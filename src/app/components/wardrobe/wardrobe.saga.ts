import list from './list/list.saga';
import detail from './detail/detail.saga';

export default [...list, ...detail];
