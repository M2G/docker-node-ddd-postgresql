import t from 'tcomb';

const StatusName = t.struct({
  status_name: t.maybe(t.String),
  status_name_id: t.maybe(t.Number)
});

export default StatusName;
