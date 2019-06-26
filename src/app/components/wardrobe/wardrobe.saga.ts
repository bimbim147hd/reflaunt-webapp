import list from './list/list.saga';
import detail from './selling-detail/detail.saga';

export default [...list, ...detail];
