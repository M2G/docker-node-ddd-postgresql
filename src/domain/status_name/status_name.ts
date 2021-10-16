import t from 'tcomb';

const StatusName = t.struct({
  status_name: t.String,
  status_name_id: t.Number
});

export default StatusName;
