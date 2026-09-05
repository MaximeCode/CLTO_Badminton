import * as React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate, Link } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  Box,
  IconButton,
  Status,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Typography,
} from '@strapi/design-system';
import { Pencil } from '@strapi/icons';
import { useFetchClient, Widget } from '@strapi/strapi/admin';

const BASE_MAX_WIDTH = '10rem';

const CellTypography = styled(Typography)`
  display: block;
  max-width: ${({ $maxWidth }) => $maxWidth || BASE_MAX_WIDTH};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RELATIVE_UNITS = [
  ['year', 60 * 60 * 24 * 365],
  ['month', 60 * 60 * 24 * 30],
  ['day', 60 * 60 * 24],
  ['hour', 60 * 60],
  ['minute', 60],
  ['second', 1],
];

function RelativeTime({ timestamp }) {
  const { formatRelativeTime, formatDate, formatTime } = useIntl();
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

  if (Number.isNaN(date.getTime())) {
    return <Typography textColor="neutral600">-</Typography>;
  }

  const diffSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const abs = Math.abs(diffSeconds);
  const unitEntry = RELATIVE_UNITS.find(([, seconds]) => abs >= seconds) || RELATIVE_UNITS.at(-1);
  const [unit, seconds] = unitEntry;
  const value = Math.round(diffSeconds / seconds);

  return (
    <time dateTime={date.toISOString()} title={`${formatDate(date)} ${formatTime(date)}`}>
      {formatRelativeTime(value, unit, { numeric: 'auto' })}
    </time>
  );
}

function DocumentStatusBadge({ status }) {
  const { formatMessage } = useIntl();

  if (!status) {
    return (
      <Typography textColor="neutral600" aria-hidden>
        -
      </Typography>
    );
  }

  const variant =
    status === 'draft' ? 'secondary' : status === 'published' ? 'success' : 'alternative';

  return (
    <Status size="S" variant={variant} role="status" aria-label={status}>
      <Typography tag="span" variant="omega" fontWeight="bold">
        {formatMessage({
          id: `content-manager.containers.List.${status}`,
          defaultMessage: status,
        })}
      </Typography>
    </Status>
  );
}

function getEditViewLink(document) {
  const isSingleType = document.kind === 'singleType';
  const kindPath = isSingleType ? 'single-types' : 'collection-types';
  const queryParams = document.locale ? `?plugins[i18n][locale]=${document.locale}` : '';
  return `/content-manager/${kindPath}/${document.contentTypeUid}${isSingleType ? '' : `/${document.documentId}`
    }${queryParams}`;
}

function RecentDocumentsTable({ documents, timeField, timeLabelId, timeLabelDefault }) {
  const { formatMessage } = useIntl();
  const navigate = useNavigate();

  const handleRowClick = (document) => () => {
    navigate(getEditViewLink(document));
  };

  return (
    <Table colCount={8} rowCount={(documents?.length ?? 0) + 1}>
      <Thead>
        <Tr>
          <Th>
            <Typography variant="sigma">
              {formatMessage({
                id: 'enhanced-homepage.widget.column.title',
                defaultMessage: 'Title',
              })}
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma">
              {formatMessage({
                id: 'enhanced-homepage.widget.column.type',
                defaultMessage: 'Type',
              })}
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma">
              {formatMessage({
                id: 'enhanced-homepage.widget.column.status',
                defaultMessage: 'Status',
              })}
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma">
              {formatMessage({
                id: 'enhanced-homepage.widget.column.updatedBy',
                defaultMessage: 'Updated by',
              })}
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma">
              {formatMessage({
                id: timeLabelId,
                defaultMessage: timeLabelDefault,
              })}
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma">
              {formatMessage({
                id: 'enhanced-homepage.widget.column.createdBy',
                defaultMessage: 'Created by',
              })}
            </Typography>
          </Th>
          <Th>
            <Typography variant="sigma">
              {formatMessage({
                id: 'enhanced-homepage.widget.column.createdAt',
                defaultMessage: 'Created at',
              })}
            </Typography>
          </Th>
          <Th aria-label={formatMessage({
            id: 'content-manager.actions.edit.label',
            defaultMessage: 'Edit',
          })} />
        </Tr>
      </Thead>
      <Tbody>
        {documents?.map((document) => (
          <Tr
            key={`${document.documentId}-${document.locale ?? 'default'}-${document.updatedAt}`}
            onClick={handleRowClick(document)}
            cursor="pointer"
          >
            <Td>
              <CellTypography title={document.title} variant="omega" textColor="neutral800">
                {document.title || '-'}
              </CellTypography>
            </Td>
            <Td>
              <CellTypography variant="omega" textColor="neutral600">
                {document.kind === 'singleType'
                  ? formatMessage({
                    id: 'content-manager.widget.last-edited.single-type',
                    defaultMessage: 'Single-Type',
                  })
                  : formatMessage({
                    id: document.contentTypeDisplayName,
                    defaultMessage: document.contentTypeDisplayName,
                  })}
              </CellTypography>
            </Td>
            <Td>
              <Box display="inline-block">
                <DocumentStatusBadge status={document.status} />
              </Box>
            </Td>
            <Td>
              <CellTypography
                title={document.createdBy || undefined}
                variant="omega"
                textColor="neutral600"
              >
                {document.createdBy || '-'}
              </CellTypography>
            </Td>
            <Td>
              <Typography textColor="neutral600">
                {document.createdAt ? <RelativeTime timestamp={document.createdAt} /> : '-'}
              </Typography>
            </Td>
            <Td>
              <CellTypography
                title={document.updatedBy || undefined}
                variant="omega"
                textColor="neutral600"
              >
                {document.updatedBy || '-'}
              </CellTypography>
            </Td>
            <Td>
              <Typography textColor="neutral600">
                {document[timeField] ? <RelativeTime timestamp={document[timeField]} /> : '-'}
              </Typography>
            </Td>
            <Td onClick={(e) => e.stopPropagation()}>
              <Box display="inline-block">
                <IconButton
                  tag={Link}
                  to={getEditViewLink(document)}
                  label={formatMessage({
                    id: 'content-manager.actions.edit.label',
                    defaultMessage: 'Edit',
                  })}
                  variant="ghost"
                >
                  <Pencil />
                </IconButton>
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function useRecentDocuments(action) {
  const { get } = useFetchClient();
  const [state, setState] = React.useState({
    loading: true,
    data: null,
    error: null,
  });

  React.useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const { data } = await get(`/enhanced-homepage/recent-documents?action=${action}`);
        if (!cancelled) {
          setState({ loading: false, data: data?.data ?? data, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({ loading: false, data: null, error: err });
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [action, get]);

  return state;
}

export function EnhancedLastEditedWidget() {
  const { formatMessage } = useIntl();
  const { loading, data, error } = useRecentDocuments('update');

  if (loading) return <Widget.Loading />;
  if (error || !data) return <Widget.Error />;
  if (data.length === 0) {
    return (
      <Widget.NoData>
        {formatMessage({
          id: 'content-manager.widget.last-edited.no-data',
          defaultMessage: 'No edited entries',
        })}
      </Widget.NoData>
    );
  }

  return (
    <RecentDocumentsTable
      documents={data}
      timeField="updatedAt"
      timeLabelId="enhanced-homepage.widget.column.updatedAt"
      timeLabelDefault="Updated"
    />
  );
}

export function EnhancedLastPublishedWidget() {
  const { formatMessage } = useIntl();
  const { loading, data, error } = useRecentDocuments('publish');

  if (loading) return <Widget.Loading />;
  if (error || !data) return <Widget.Error />;
  if (data.length === 0) {
    return (
      <Widget.NoData>
        {formatMessage({
          id: 'content-manager.widget.last-published.no-data',
          defaultMessage: 'No published entries',
        })}
      </Widget.NoData>
    );
  }

  return (
    <RecentDocumentsTable
      documents={data}
      timeField="publishedAt"
      timeLabelId="enhanced-homepage.widget.column.publishedAt"
      timeLabelDefault="Published"
    />
  );
}
