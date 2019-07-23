import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RouterProps } from "react-router";
import { Layout, PageHeader, Button, Tooltip, Switch, Table, Divider, Tag, Popover, Steps } from 'antd';
import moment from 'moment';
import {
    FETCH_CAMPAIGNS,
    SHOW_CAMPAIGN_CREATION_MODAL,
    HIDE_CAMPAIGN_CREATION_MODAL,
    UPDATE_CAMPAIGN_ENABLED,
    DELETE_CAMPAIGN,
    UPDATE_CAMPAIGN_SET_MODEL,
} from '../../../reducers/campaigns/constantes';
import CreateCampaignForm from './CreateCampaignForm';
import { ICampaign } from '../interfaces';
import './index.css';
import Column from 'antd/lib/table/Column';
import Paragraph from 'antd/lib/typography/Paragraph';
import { FETCH_UPLOADED_MOVIES } from '../../../reducers/uploadedMovies/constantes';

const { Step } = Steps;

export interface ICampaignsProps extends RouterProps{}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default (props: ICampaignsProps) => {
    const { campaigns } = useSelector((state: any) => ({
        campaigns: state.campaigns,
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: FETCH_CAMPAIGNS })
    }, []);

    const showDisplayCreationModal = () => {
        dispatch({ type: SHOW_CAMPAIGN_CREATION_MODAL });
    };

    const hideDisplayCreationModal = () => {
        dispatch({ type: HIDE_CAMPAIGN_CREATION_MODAL });
    };

    const handleEditButton = (campaign: ICampaign) => {
        const { history } = props;

        dispatch({ type: FETCH_UPLOADED_MOVIES })
        dispatch({
          type: UPDATE_CAMPAIGN_SET_MODEL,
          payload: campaign,
        })
        history.push(`/app/campaigns/${campaign.id}`);
    };

    const handleSwitchButton = (enabled: boolean, campaign: ICampaign) => {
        dispatch({
            type: UPDATE_CAMPAIGN_ENABLED,
            payload: {
                ...campaign,
                enabled: enabled,
            }
        })
    };

    const deleteCampaign = (id: string) => {
        dispatch({
            type: DELETE_CAMPAIGN,
            payload: id,
        });
    };

    return (
      <Layout className="campaigns-page-container">
          <PageHeader
            title="Campagnes"
            subTitle="Paramétrez les campagnes de diffusion de vos films ajoutés sur la plateforme"
            className="campaigns-page-header"
          />
          <Table dataSource={campaigns.campaigns}>
            <Column
              title="Name"
              key="name"
              render={(_: any, campaign: any) => (
                <Fragment>
                  <Paragraph copyable={campaign.name}>{campaign.name}</Paragraph>
                  <span>
                    {campaign.enabled ? <Tag color="green">ENABLED</Tag> : <Tag color="red">DISABLED</Tag>}
                    <Popover content={campaign.id} title="Campaign internal identifier">
                      <Button
                        type="default"
                        icon="info-circle"
                        shape="circle-outline"
                      />
                    </Popover>
                  </span>
                </Fragment>
              )}
            />
            <Column
              title="Timeline"
              key="timeline"
              render={(_: any, campaign: any) => {
                const now = moment().unix()
                let current = 2
                if (campaign.startTime / 1000 > now) {
                  current = 1
                } else if (campaign.endTime / 1000 < now) {
                  current = 3
                }
                if (!campaign.enabled) {
                  current = 0
                }

                return (
                  <Steps current={current}>
                    <Step title="Disabled" description="Your campaign is currently disabled" />
                    <Step title="Beign started" description={moment(campaign.startTime).format("MMM Do YYYY")} />
                    <Step title="In Progress" description="Your campaign is currently beign broadcast" />
                    <Step title="Terminated" description={moment(campaign.endTime).format("MMM Do YYYY")} />
                  </Steps>
                )
              }}
            />
            <Column 
              title="Clicks"
              key="clicks"
              render={() => getRandomInt(5000)}
            />
            <Column 
              title="Views"
              key="views"
              render={() => getRandomInt(3000)}
            />
            <Column
              title="Actions"
              key="actions"
              render={(_: any, campaign: any) => (
                <Fragment>
                  <Button
                    type="danger"
                    title="Delete campaign"
                    icon="delete"
                    shape="circle-outline"
                    onClick={() => deleteCampaign(campaign.id)}
                  />
                  <Button
                    type="default"
                    title="Edit campaign"
                    icon="edit"
                    shape="circle-outline"
                    onClick={() => handleEditButton(campaign)}
                  />
                  <Divider type="vertical" />
                  <Switch
                        onClick={(enabled: boolean) => handleSwitchButton(enabled, campaign)}
                        checked={campaign.enabled}
                        title="Campaign status"
                        loading={campaigns.updatingEnabled}
                    />
                </Fragment>
              )}
            />
          </Table>
          <CreateCampaignForm
            visible={campaigns.showCampaignCreationModal}
            hideModal={hideDisplayCreationModal}
          />
          <Tooltip
            placement="left"
            title="Créer une campagne"
          >
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              className="add-campaign-button floating-button"
              size="large"
              onClick={showDisplayCreationModal}
            />
          </Tooltip>
      </Layout>
    );
}