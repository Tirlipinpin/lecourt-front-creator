import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RouterProps } from "react-router";
import { Layout, List, PageHeader, Button, Tooltip, Switch, Timeline } from 'antd';
import moment from 'moment';
import { FETCH_CAMPAIGNS, UPDATE_CAMPAIGN_ENABLED } from '../../../reducers/campaigns/constantes';
import CreateCampaignForm from './CreateCampaignForm';
import { ICampaigns } from '../interfaces';
import './index.css';

export interface ICampaignsProps extends RouterProps{}

export default (props: ICampaignsProps) => {
    const { campaigns } = useSelector((state: any) => ({
        campaigns: state.campaigns,
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: FETCH_CAMPAIGNS })
    }, []);

    const [ displayCreationModal, handleDisplayCreationModal ] = useState(false);

    const goToCampaignDetails = (id: string) => {
        const { history } = props;

        history.push(`/app/campaigns/${id}`);
    };

    const handleSwitchButton = (enabled: boolean, campaign: ICampaigns) => {
        dispatch({
            type: UPDATE_CAMPAIGN_ENABLED,
            payload: {
                ...campaign,
                enabled: enabled,
            }
        })
    };

    console.log(moment);

    return (
      <Layout className="campaigns-page-container">
          <PageHeader
            title="Campagnes"
            subTitle="Paramétrez les campagnes de diffusion de vos films ajoutés sur la plateforme"
            className="campaigns-page-header"
          />
          <List
            className="campaigns-list"
            itemLayout="vertical"
            size="large"
            pagination={{
                pageSize: 5,
            }}
            dataSource={campaigns.campaigns}
            renderItem={(item: ICampaigns) => (
              <List.Item
                onClick={() => goToCampaignDetails(item.id)}
                key={item.name}
                className="campaigns-list-item"
                extra={
                    <Timeline>
                        <Timeline.Item color="green">{moment(item.startTime).format('YYYY-MM-DD')}</Timeline.Item>
                        <Timeline.Item>{moment(moment.now()).format('YYYY-MM-DD')}</Timeline.Item>
                        <Timeline.Item color="red">{moment(item.endTime).format('YYYY-MM-DD')}</Timeline.Item>
                    </Timeline>
                }
              >
                  <List.Item.Meta
                    title={item.name}
                    description={item.note}
                  />
                  <Switch
                    onClick={(enabled: boolean) => handleSwitchButton(enabled, item)}
                    checkedChildren="Activée"
                    unCheckedChildren="Désactivée"
                    checked={item.enabled}
                    loading={campaigns.updatingEnabled}
                  />
              </List.Item>
            )}
          />
          <CreateCampaignForm visible={displayCreationModal} handleVisibility={handleDisplayCreationModal} />
          <Tooltip title="Créer une campagne">
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              className="add-campaign-button"
              size="large"
              onClick={() => handleDisplayCreationModal(true)}
            />
          </Tooltip>
      </Layout>
    );
}