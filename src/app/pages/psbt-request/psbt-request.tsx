import { isUndefined } from '@shared/utils';

import { useRouteHeader } from '@app/common/hooks/use-route-header';
import { LoadingSpinner } from '@app/components/loading-spinner';
import { PopupHeader } from '@app/features/current-account/popup-header';
import { useOnOriginTabClose } from '@app/routes/hooks/use-on-tab-closed';
import { useIsPsbtRequestValid } from '@app/store/psbts/requests.hooks';

import { PsbtDecodedRequest } from './components/psbt-decoded-request/psbt-decoded-request';
import { PsbtRequestActions } from './components/psbt-request-actions';
import { PsbtRequestHeader } from './components/psbt-request-header';
import { PsbtRequestWarningLabel } from './components/psbt-request-warning-label';
import { PsbtRequestLayout } from './components/psbt-request.layout';
import { usePsbtRequest } from './hooks/use-psbt-request';

export function PsbtRequest() {
  const validPsbtRequest = useIsPsbtRequestValid();
  const { appName, decodedPsbt, isLoading, onCancel, onSignPsbt, psbtPayload, requestToken } =
    usePsbtRequest();

  useRouteHeader(<PopupHeader displayAddresssBalanceOf="all" />);

  useOnOriginTabClose(() => window.close());

  if (!psbtPayload || isUndefined(validPsbtRequest) || !validPsbtRequest || !requestToken)
    return null;

  if (isLoading) return <LoadingSpinner height="600px" />;

  return (
    <>
      <PsbtRequestLayout>
        <PsbtRequestHeader />
        <PsbtRequestWarningLabel appName={appName} />
        <PsbtDecodedRequest psbt={decodedPsbt} />
      </PsbtRequestLayout>
      <PsbtRequestActions isLoading={isLoading} onCancel={onCancel} onSignPsbt={onSignPsbt} />
    </>
  );
}
