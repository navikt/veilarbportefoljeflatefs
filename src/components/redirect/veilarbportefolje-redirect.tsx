import React, {useEffect, useState} from 'react';
import {RouteProps, useHistory, useLocation} from "react-router";
import {useOnMount} from "../../hooks/use-on-mount";
import {useDispatch} from "react-redux";
import {useQueryParams} from "../../hooks/use-query-params";
import {velgEnhetForVeileder} from "../../ducks/valgt-enhet";
import NavFrontendSpinner from "nav-frontend-spinner";
import {useEnhetSelector} from "../../hooks/redux/use-enhet-selector";



export function VeilarbPortefoljeRedirect(props: RouteProps) {

}
