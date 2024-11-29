import React, { useEffect } from "react";
import "./KakaoLocation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const KakaoLocation = () => {
  useEffect(() => {
    // Kakao Maps API 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=3b061c4784257ee38d27f95193ab58b8&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map"); // 지도를 표시할 div
        const options = {
          center: new window.kakao.maps.LatLng(35.180319, 128.092009), // 초기 지도 중심좌표
          level: 3, // 확대 레벨
        };

        const map = new window.kakao.maps.Map(container, options);

        // Geolocation API로 현재 위치 가져오기
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;

              // 현재 위치 좌표 생성
              const currentLatLng = new window.kakao.maps.LatLng(
                latitude,
                longitude
              );

              // 지도 중심을 현재 위치로 이동
              map.setCenter(currentLatLng);

              // 현재 위치에 마커 추가
              new window.kakao.maps.Marker({
                position: currentLatLng,
                map: map,
              });
            },
            (error) => {
              console.error("위치를 가져올 수 없습니다:", error);
            }
          );
        } else {
          console.error("Geolocation을 지원하지 않는 브라우저입니다.");
        }
      });
    };

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div className="kakao-location">
      <div id="map" className="map-container"></div>
      <div className="location-info">
        <FontAwesomeIcon className="icon" icon={faMapMarkerAlt} />
        <div className="address">
          경상남도 경상국립대 칠암 캠퍼스 공학 1호관
        </div>
      </div>
      <button
          type="submit"
          className="PwUpdate-button"
        >
          위치변경
        </button>
    </div>
  );
};

export default KakaoLocation;
